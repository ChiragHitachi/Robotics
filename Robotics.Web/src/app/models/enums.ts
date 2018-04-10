export enum responseStatus {
    Success,
    Failure,
    APIError,
    Forbidden,
    ApiNotAvailable,
    InvalidInput,
    NotAuthorized,
    NoDataFound,
    SessionExpired,
    UnknownError,
    Timeout
}

export enum opMode {
    Create = 1,
    Edit = 2,
    View = 3,
}

export enum messageType {
    Success = 1,
    Warning = 2,
    Error = 3
}


export enum sortOrder {
    Asc = 1,
    Desc = 2
}

