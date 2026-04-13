import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Cycles "mo:base/ExperimentalCycles";



actor {

  // ─── Custom User Management ────────────────────────────────────────

  public type SdUser = {
    id : Text;
    name : Text;
    email : Text;
    password : Text;
    phone : Text;
    role : Text;
    status : Text;
    createdAt : Text;
    lastLogin : Text;
  };

  var sdUsersJsonBlob : Text = "[]";
  var sdUsers : [SdUser] = [];
  var sdUserCounter : Nat = 100;

  func nextSdUserId() : Text {
    sdUserCounter += 1;
    "sd" # sdUserCounter.toText();
  };

  public func initSeedUsers() : async () {
    let adminExists = sdUsers.find(func(u) {
      u.email.toLower() == "kumardsemail@gmail.com" and u.role == "admin"
    });
    if (adminExists == null) {
      let cleaned = sdUsers.filter(func(u) {
        u.email.toLower() != "rahul@servicedesk.com" and
        u.email.toLower() != "supervisor@servicedesk.com"
      });
      sdUsers := cleaned.concat<SdUser>([
        { id = "u1"; name = "Admin"; email = "kumardsemail@gmail.com"; password = "Admin@123";
          phone = ""; role = "admin"; status = "approved"; createdAt = "2025-01-01"; lastLogin = "" }
      ]);
    };
  };

  public query func getSdUsers() : async [SdUser] { sdUsers };

  public query func loginSdUser(email : Text, password : Text) : async ?SdUser {
    sdUsers.find<SdUser>(func(u) {
      u.email.toLower() == email.toLower()
        and u.password == password and u.status == "approved"
    });
  };

  public func createSdUser(id : Text, name : Text, email : Text, password : Text,
      phone : Text, role : Text, status : Text, createdAt : Text) : async SdUser {
    let newId = if (id == "") { nextSdUserId() } else { id };
    let user : SdUser = { id = newId; name; email; password; phone; role; status; createdAt; lastLogin = "" };
    sdUsers := sdUsers.concat<SdUser>([user]);
    user;
  };

  public func approveSdUser(userId : Text) : async () {
    sdUsers := sdUsers.map<SdUser, SdUser>(func(u) {
      if (u.id == userId) { { u with status = "approved" } } else { u };
    });
  };

  public func rejectSdUser(userId : Text) : async () {
    sdUsers := sdUsers.map<SdUser, SdUser>(func(u) {
      if (u.id == userId) { { u with status = "rejected" } } else { u };
    });
  };

  public func editSdUser(userId : Text, name : Text, email : Text,
      phone : Text, role : Text, password : Text) : async () {
    sdUsers := sdUsers.map<SdUser, SdUser>(func(u) {
      if (u.id == userId) {
        let newPwd = if (password == "") { u.password } else { password };
        { u with name; email; password = newPwd; phone; role }
      } else { u };
    });
  };

  public func deleteSdUser(userId : Text) : async () {
    sdUsers := sdUsers.filter<SdUser>(func(u) { u.id != userId });
  };

  public func updateSdUserLogin(userId : Text, loginTime : Text) : async () {
    sdUsers := sdUsers.map<SdUser, SdUser>(func(u) {
      if (u.id == userId) { { u with lastLogin = loginTime } } else { u };
    });
  };

  // Users JSON blob — for cross-device sync (frontend manages serialization)
  public func setSdUsersJson(json : Text) : async () {
    sdUsersJsonBlob := json;
  };
  public query func getSdUsersJson() : async Text {
    sdUsersJsonBlob;
  };

  // ─── Part Requests ────────────────────────────────────────────────────

  // V1 type: kept for stable memory compatibility during upgrade
  type SdPartRequestV1 = {
    id : Text; caseId : Text; caseDbId : Text; customerName : Text;
    partName : Text; partCode : Text; partPhotoUrl : Text;
    requestedBy : Text; requestedByName : Text; requestedAt : Text;
    status : Text; technicianId : Text; issuedAt : Text;
    issuedBy : Text; issuedByName : Text; rejectedReason : Text;
    rejectedAt : Text; rejectedBy : Text; rejectedByName : Text;
    message : Text; productType : Text; companyName : Text;
  };

  public type SdPartRequest = {
    id : Text; caseId : Text; caseDbId : Text; customerName : Text;
    partName : Text; partCode : Text; partPhotoUrl : Text;
    requestedBy : Text; requestedByName : Text; requestedAt : Text;
    status : Text; technicianId : Text; issuedAt : Text;
    issuedBy : Text; issuedByName : Text; rejectedReason : Text;
    rejectedAt : Text; rejectedBy : Text; rejectedByName : Text;
    message : Text; productType : Text; companyName : Text;
    priority : Text; cancelledBy : Text; cancelledByName : Text; cancelledAt : Text;
  };

  // V1 array kept in state for upgrade compatibility (populated from old stable memory)
  var sdPartRequests : [SdPartRequestV1] = [];
  var sdPartRequestsV2 : [SdPartRequest] = [];
  var sdPartRequestsV2JsonBlob : Text = "[]";
  var sdPartReqMigrated : Bool = false;
  var sdPartReqCounter : Nat = 0;

  // Run V1 → V2 migration if not yet done (handles first upgrade from old actor)
  func ensurePartReqMigrated() {
    if (not sdPartReqMigrated and sdPartRequests.size() > 0) {
      sdPartRequestsV2 := sdPartRequestsV2.concat<SdPartRequest>(
        sdPartRequests.map<SdPartRequestV1, SdPartRequest>(func(r) {
          { id=r.id; caseId=r.caseId; caseDbId=r.caseDbId; customerName=r.customerName;
            partName=r.partName; partCode=r.partCode; partPhotoUrl=r.partPhotoUrl;
            requestedBy=r.requestedBy; requestedByName=r.requestedByName; requestedAt=r.requestedAt;
            status=r.status; technicianId=r.technicianId; issuedAt=r.issuedAt;
            issuedBy=r.issuedBy; issuedByName=r.issuedByName; rejectedReason=r.rejectedReason;
            rejectedAt=r.rejectedAt; rejectedBy=r.rejectedBy; rejectedByName=r.rejectedByName;
            message=r.message; productType=r.productType; companyName=r.companyName;
            priority="normal"; cancelledBy=""; cancelledByName=""; cancelledAt="";
          };
        })
      );
      sdPartRequests := [];
      sdPartReqMigrated := true;
    };
  };

  func nextPartReqId() : Text {
    sdPartReqCounter += 1;
    "pr" # sdPartReqCounter.toText();
  };

  public query func getSdPartRequests() : async [SdPartRequest] {
    sdPartRequestsV2;
  };

  public func createSdPartRequest(
    id : Text, caseId : Text, caseDbId : Text, customerName : Text,
    partName : Text, partCode : Text, partPhotoUrl : Text,
    requestedBy : Text, requestedByName : Text, requestedAt : Text,
    message : Text, productType : Text, companyName : Text, priority : Text
  ) : async SdPartRequest {
    ensurePartReqMigrated();
    let newId = if (id == "") { nextPartReqId() } else { id };
    let req : SdPartRequest = {
      id=newId; caseId; caseDbId; customerName; partName; partCode; partPhotoUrl;
      requestedBy; requestedByName; requestedAt; status="pending";
      technicianId=""; issuedAt=""; issuedBy=""; issuedByName="";
      rejectedReason=""; rejectedAt=""; rejectedBy=""; rejectedByName="";
      message; productType; companyName; priority;
      cancelledBy=""; cancelledByName=""; cancelledAt="";
    };
    sdPartRequestsV2 := sdPartRequestsV2.concat<SdPartRequest>([req]);
    req;
  };

  public func issueSdPartRequest(id : Text, technicianId : Text,
      issuedAt : Text, issuedBy : Text, issuedByName : Text) : async () {
    sdPartRequestsV2 := sdPartRequestsV2.map<SdPartRequest, SdPartRequest>(func(r) {
      if (r.id == id) {
        { r with status="issued"; technicianId; issuedAt; issuedBy; issuedByName };
      } else { r };
    });
  };

  public func rejectSdPartRequest(id : Text, reason : Text,
      rejectedAt : Text, rejectedBy : Text, rejectedByName : Text) : async () {
    sdPartRequestsV2 := sdPartRequestsV2.map<SdPartRequest, SdPartRequest>(func(r) {
      if (r.id == id) {
        { r with status="rejected"; rejectedReason=reason; rejectedAt; rejectedBy; rejectedByName };
      } else { r };
    });
  };

  public func deleteSdPartRequest(id : Text) : async () {
    sdPartRequestsV2 := sdPartRequestsV2.filter<SdPartRequest>(func(r) { r.id != id });
  };

  public func cancelSdPartRequest(id : Text,
      cancelledBy : Text, cancelledByName : Text, cancelledAt : Text) : async () {
    sdPartRequestsV2 := sdPartRequestsV2.map<SdPartRequest, SdPartRequest>(func(r) {
      if (r.id == id) {
        { r with status="cancelled"; cancelledBy; cancelledByName; cancelledAt };
      } else { r };
    });
  };

  // Part Requests V2 JSON blob — for cross-device sync (frontend manages serialization)
  public func setSdPartRequestsV2Json(json : Text) : async () {
    sdPartRequestsV2JsonBlob := json;
  };
  public query func getSdPartRequestsV2Json() : async Text {
    sdPartRequestsV2JsonBlob;
  };

  // ─── JSON Blob Storage ─────────────────────────────────────────────────

  var sdCasesJson : [Text] = [];
  var sdNoticesJson : [Text] = [];
  var sdInventoryJson : Text = "{}";
  var sdAppDataJson : Text = "{}";
  var sdPartRequestsJson : Text = "[]";

  // Cases — array interface (frontend stores each chunk as an array element)
  public func setSdCasesJson(json : [Text]) : async () {
    sdCasesJson := json;
  };
  public query func getSdCasesJson() : async [Text] {
    sdCasesJson;
  };

  // Legacy single-blob aliases (kept for backward compatibility)
  public func setSdCases(jsonBlob : Text) : async () {
    sdCasesJson := [jsonBlob];
  };

  // Notices — array interface
  public func setSdNoticesJson(json : [Text]) : async () {
    sdNoticesJson := json;
  };
  public query func getSdNoticesJson() : async [Text] {
    sdNoticesJson;
  };

  // Legacy single-blob alias
  public func setSdNotices(jsonBlob : Text) : async () {
    sdNoticesJson := [jsonBlob];
  };

  // Inventory
  public func setSdInventoryJson(jsonBlob : Text) : async () {
    sdInventoryJson := jsonBlob;
  };
  public query func getSdInventoryJson() : async Text { sdInventoryJson };

  // Legacy alias
  public func setSdInventory(jsonBlob : Text) : async () {
    sdInventoryJson := jsonBlob;
  };

  // App Data (technicians, vendors, warehouse, settings, notifications)
  public func setSdAppDataJson(jsonBlob : Text) : async () {
    sdAppDataJson := jsonBlob;
  };
  public query func getSdAppDataJson() : async Text { sdAppDataJson };

  // Legacy alias
  public func setSdAppData(jsonBlob : Text) : async () {
    sdAppDataJson := jsonBlob;
  };

  // Part Requests JSON blob (alternative storage for complex multi-part requests)
  public func setSdPartRequestsJson(jsonBlob : Text) : async () {
    sdPartRequestsJson := jsonBlob;
  };
  public query func getSdPartRequestsJson() : async Text { sdPartRequestsJson };

  // ─── Admin: Clear All Data (keep users) ────────────────────────────
  public func clearAllData() : async () {
    sdCasesJson := [];
    sdNoticesJson := [];
    sdInventoryJson := "{}";
    sdAppDataJson := "{}";
    sdPartRequestsJson := "[]";
    sdPartRequestsV2 := [];
    sdPartRequests := [];
    sdPartReqMigrated := true;
    sdPartReqCounter := 0;
  };

  // ─── Midnight Task Flag ──────────────────────────────────────────────
  // Replaces localStorage midnightTasksRunToday — persists across all devices

  var midnightTaskRanDate : Text = "";

  public query func getMidnightTaskRanDate() : async Text {
    midnightTaskRanDate;
  };

  public func setMidnightTaskRanDate(date : Text) : async () {
    midnightTaskRanDate := date;
  };

  // ─── AI Insights Cache ───────────────────────────────────────────────
  // Caches AI responses on the backend; TTL (1 hour) managed by frontend

  var aiInsightsCache : Text = "";
  var aiInsightsCacheTime : Int = 0;

  public query func getAIInsightsCache() : async Text {
    aiInsightsCache;
  };

  public func setAIInsightsCache(data : Text) : async () {
    aiInsightsCache := data;
  };

  public query func getAIInsightsCacheTime() : async Int {
    aiInsightsCacheTime;
  };

  public func setAIInsightsCacheTime(ts : Int) : async () {
    aiInsightsCacheTime := ts;
  };

  // ─── AI Insights HTTP Outcall ────────────────────────────────────────
  // Calls OpenAI gpt-4o-mini with inventory+case context; returns JSON or ""

  type HttpHeader = { name : Text; value : Text };
  type HttpMethod = { #get; #head; #post };
  type HttpRequestResult = { status : Nat; headers : [HttpHeader]; body : Blob };
  type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    method : HttpMethod;
    headers : [HttpHeader];
    body : ?Blob;
    transform : ?{
      function : shared query ({ response : HttpRequestResult; context : Blob }) -> async HttpRequestResult;
      context : Blob;
    };
    is_replicated : ?Bool;
  };

  let IC = actor "aaaaa-aa" : actor {
    http_request : HttpRequestArgs -> async HttpRequestResult;
  };

  func escapeJson(s : Text) : Text {
    var result = s;
    result := result.replace(#text "\\", "\\\\");
    result := result.replace(#text "\"", "\\\"");
    result := result.replace(#text "\n", "\\n");
    result := result.replace(#text "\r", "\\r");
    result := result.replace(#text "\t", "\\t");
    result;
  };

  public func getAIInsights(contextJson : Text) : async Text {
    let prompt = "You are an inventory and service desk AI analyst. Based on the following data, provide JSON with keys: demandForecast (array of {partCode, partName, recommendation, urgency}), deadStock (array of {partCode, partName, daysIdle, action}), insights (array of strings - 3-5 key insights about the data), overallHealthScore (0-100). Data: " # contextJson;
    let requestBody = "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"user\",\"content\":\"" # escapeJson(prompt) # "\"}],\"max_tokens\":1000,\"temperature\":0.3}";
    let bodyBlob = requestBody.encodeUtf8();

    let args : HttpRequestArgs = {
      url = "https://api.openai.com/v1/chat/completions";
      max_response_bytes = ?16384;
      method = #post;
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "Authorization"; value = "Bearer OPENAI_API_KEY_PLACEHOLDER" },
      ];
      body = ?bodyBlob;
      transform = null;
      is_replicated = ?false;
    };

    try {
      Cycles.add<system>(50_000_000_000);
      let response = await IC.http_request(args);
      switch (response.body.decodeUtf8()) {
        case (?text) { text };
        case null { "" };
      };
    } catch (_) {
      "";
    };
  };

};
