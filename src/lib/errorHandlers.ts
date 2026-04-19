export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string | null;
    email: string | null;
    emailVerified: boolean | null;
    isAnonymous: boolean | null;
    providerInfo: any[];
  }
}

export function handleFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const auth = (window as any).firebaseAuth; // Assuming auth is accessible globally or passed in
  const user = auth?.currentUser;

  const errorInfo: FirestoreErrorInfo = {
    error: error?.message || String(error),
    operationType: operation,
    path: path,
    authInfo: {
      userId: user?.uid || null,
      email: user?.email || null,
      emailVerified: user?.emailVerified || null,
      isAnonymous: user?.isAnonymous || null,
      providerInfo: user?.providerData || [],
    }
  };

  throw new Error(JSON.stringify(errorInfo));
}
