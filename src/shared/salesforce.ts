import { Connection } from '@salesforce/core';
import { LimitsConsumed, SalesforceLimits, SalesforceResult } from './types';

let WriteToSalesforce = async (name: string, limits: LimitsConsumed, conn: Connection) => {
    const dateStr=new Date().toISOString().substring(0, 10);
    const sfLimits: SalesforceLimits={
        Name: name + ' - ' + dateStr,
        Identifier__c: name,
        SOQL_Queries__c: limits.soqlQueries,
        SOQL_Query_Rows__c: limits.queryRows,
        SOSL_Queries__c: limits.soslQueries,
        DML_Statements__c: limits.dmlStatements,
        Publish_Immediate_DML__c: limits.publishImmediateDml,
        DML_Rows__c: limits.dmlRows,
        CPU_Time__c: limits.cpuTime,
        Heap_Size__c: limits.heapSize,
        Callouts__c: limits.callouts,
        Emails__c: limits.emails,
        Future_Calls__c: limits.futureCalls,
        Queueables__c: limits.queueables,
        Mobile_Push_Notifications__c: limits.mobilePush
    }

    let result:SalesforceResult={success:true};
    try {
        let opResult=await conn.sobject('Limits_Consumed__c').insert(sfLimits);    
        result.success=opResult.success;
        if (!result.success) {
            result.errorMessage=opResult['errors'].join(',');
        }
    }
    catch (err) {
        result.success=false;
        result.errorCode=err.name;
        result.errorMessage=err.message;
    }

    return result;
}

export {WriteToSalesforce};