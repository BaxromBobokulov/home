export class InternalError extends Error{
    constructor(status,message) {
        super()
        this.status = status
        this.message = message
        this.name = "InternalError"
    }
}

export class BadRequestError extends Error{
    constructor(status,message) {
        super()
        this.status = status
        this.message = message
        this.name = "BadRequestError"
    }
}

export class NotFoundError extends Error{
    constructor(status,message) {
        super()
        this.status = status
        this.message = message
        this.name = "NotFoundError"
    }
}

export class ConflictError extends Error{
    constructor(status,message) {
        super()
        this.status = status
        this.message = message
        this.name = "ConflictError"
    }
}

// export class InternalError {
//     constructor(status,message) {
//         super()
//         this.status = status
//         this.message = message
//         this.name = "InternalError"
//     }
// }

// export class InternalError {
//     constructor(status,message) {
//         super()
//         this.status = status
//         this.message = message
//         this.name = "InternalError"
//     }
// }

// export class InternalError {
//     constructor(status,message) {
//         super()
//         this.status = status
//         this.message = message
//         this.name = "InternalError"
//     }
// }

// export class InternalError {
//     constructor(status,message) {
//         super()
//         this.status = status
//         this.message = message
//         this.name = "InternalError"
//     }
// }
