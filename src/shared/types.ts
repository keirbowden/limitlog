interface LimitsConsumed {
    soqlQueries: number;
    queryRows: number;
    soslQueries: number;
    dmlStatements: number;
    publishImmediateDml: number;
    dmlRows: number;
    cpuTime: number;
    heapSize: number;
    callouts: number;
    emails: number;
    futureCalls: number;
    queueables: number;
    mobilePush: number;
}

interface SalesforceLimits {
    Name: string;
    Identifier__c: string;
    SOQL_Queries__c: number;
    SOQL_Query_Rows__c: number;
    SOSL_Queries__c: number;
    DML_Statements__c: number;
    Publish_Immediate_DML__c: number;
    DML_Rows__c: number;
    CPU_Time__c: number;
    Heap_Size__c: number;
    Callouts__c: number;
    Emails__c: number;
    Future_Calls__c: number;
    Queueables__c: number;
    Mobile_Push_Notifications__c: number;
}

interface SalesforceResult {
    success: boolean;
    errorCode?: string;
    errorMessage?: string;
}

export {LimitsConsumed, SalesforceLimits, SalesforceResult}