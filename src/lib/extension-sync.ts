// Helper functions to sync with the browser extension

export async function syncWithExtension(userId: string, focusModeActive: boolean, accessToken?: string) {
  // Use window.postMessage to communicate with content script
  // which will relay to background script
  // This is more reliable than chrome.runtime.sendMessage because we don't need to know the extension ID
  
  try {
    // Send user ID and token
    window.postMessage({
      type: 'FOCUS_SPHERE_SYNC',
      payload: { 
        action: 'setUserId', 
        userId,
        accessToken
      }
    }, '*');

    // Send focus mode status
    window.postMessage({
      type: 'FOCUS_SPHERE_SYNC',
      payload: { 
        action: 'setFocusMode', 
        active: focusModeActive 
      }
    }, '*');

    // Trigger sync
    window.postMessage({
      type: 'FOCUS_SPHERE_SYNC',
      payload: { action: 'sync' }
    }, '*');

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

export function isExtensionInstalled(): boolean {
  // We can't easily detect if the content script is running
  // But we can check if chrome runtime is available (sometimes)
  // or just assume it is if we are here
  return typeof chrome !== 'undefined' && !!chrome.runtime;
}
