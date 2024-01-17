export function conflictError(status: number, message: string, data: string | null) {
    return {status, message, data};
  }
  
  export function notFoundError(status: number, message: string, data: string | null) {
    return {status, message, data};
  }
  
  