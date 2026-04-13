import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SdUser {
    id: string;
    status: string;
    password: string;
    name: string;
    createdAt: string;
    role: string;
    email: string;
    phone: string;
    lastLogin: string;
}
export interface SdPartRequest {
    id: string;
    customerName: string;
    status: string;
    partPhotoUrl: string;
    caseDbId: string;
    rejectedReason: string;
    rejectedByName: string;
    partCode: string;
    partName: string;
    productType: string;
    cancelledAt: string;
    cancelledBy: string;
    rejectedAt: string;
    rejectedBy: string;
    message: string;
    technicianId: string;
    companyName: string;
    issuedByName: string;
    priority: string;
    caseId: string;
    issuedAt: string;
    issuedBy: string;
    cancelledByName: string;
    requestedByName: string;
    requestedAt: string;
    requestedBy: string;
}
export interface backendInterface {
    approveSdUser(userId: string): Promise<void>;
    cancelSdPartRequest(id: string, cancelledBy: string, cancelledByName: string, cancelledAt: string): Promise<void>;
    clearAllData(): Promise<void>;
    createSdPartRequest(id: string, caseId: string, caseDbId: string, customerName: string, partName: string, partCode: string, partPhotoUrl: string, requestedBy: string, requestedByName: string, requestedAt: string, message: string, productType: string, companyName: string, priority: string): Promise<SdPartRequest>;
    createSdUser(id: string, name: string, email: string, password: string, phone: string, role: string, status: string, createdAt: string): Promise<SdUser>;
    deleteSdPartRequest(id: string): Promise<void>;
    deleteSdUser(userId: string): Promise<void>;
    editSdUser(userId: string, name: string, email: string, phone: string, role: string, password: string): Promise<void>;
    getAIInsights(contextJson: string): Promise<string>;
    getAIInsightsCache(): Promise<string>;
    getAIInsightsCacheTime(): Promise<bigint>;
    getMidnightTaskRanDate(): Promise<string>;
    getSdAppDataJson(): Promise<string>;
    getSdCasesJson(): Promise<Array<string>>;
    getSdInventoryJson(): Promise<string>;
    getSdNoticesJson(): Promise<Array<string>>;
    getSdPartRequests(): Promise<Array<SdPartRequest>>;
    getSdPartRequestsJson(): Promise<string>;
    getSdPartRequestsV2Json(): Promise<string>;
    getSdUsers(): Promise<Array<SdUser>>;
    getSdUsersJson(): Promise<string>;
    initSeedUsers(): Promise<void>;
    issueSdPartRequest(id: string, technicianId: string, issuedAt: string, issuedBy: string, issuedByName: string): Promise<void>;
    loginSdUser(email: string, password: string): Promise<SdUser | null>;
    rejectSdPartRequest(id: string, reason: string, rejectedAt: string, rejectedBy: string, rejectedByName: string): Promise<void>;
    rejectSdUser(userId: string): Promise<void>;
    setAIInsightsCache(data: string): Promise<void>;
    setAIInsightsCacheTime(ts: bigint): Promise<void>;
    setMidnightTaskRanDate(date: string): Promise<void>;
    setSdAppData(jsonBlob: string): Promise<void>;
    setSdAppDataJson(jsonBlob: string): Promise<void>;
    setSdCases(jsonBlob: string): Promise<void>;
    setSdCasesJson(json: Array<string>): Promise<void>;
    setSdInventory(jsonBlob: string): Promise<void>;
    setSdInventoryJson(jsonBlob: string): Promise<void>;
    setSdNotices(jsonBlob: string): Promise<void>;
    setSdNoticesJson(json: Array<string>): Promise<void>;
    setSdPartRequestsJson(jsonBlob: string): Promise<void>;
    setSdPartRequestsV2Json(json: string): Promise<void>;
    setSdUsersJson(json: string): Promise<void>;
    updateSdUserLogin(userId: string, loginTime: string): Promise<void>;
}
