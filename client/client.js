const Public_Key="BLLyyhnGacdjD1w0vVaJ80irUywFAMIJm_QXXvwnYI7ajpfPjZ8o2Nfkt83k-GVhvYtbA1TmR2D3WrVYCHscZxo";

// checkfor service worker
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err));
}

// Register ServiceWorker, Register Push, Send Push
async function send(){
    console.log("Registering service worker...");
    // Register Service Worker
    const  register = await navigator.serviceWorker.register('/worker.js',{
        scope: "/"
    });
    console.log("service worker Registered...");


    // Register Push
    console.log("Registering Push...");

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlbase64ToUint8Array(Public_Key)
    });
    console.log("Push Registered...");

    // Send push notification
    console.log("Sending push...");
    await fetch('/subscribe',{
        method:"POST",
        body: JSON.stringify(subscription),
        headers:{
            'content-type': 'application/json'
        }

    });
    console.log("Push Sent...");


}

function urlbase64ToUint8Array(base64String){
    const padding = '='.repeat((4-base64String.length % 4) % 4);
    const base64 = (base64String+padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i=0; i<rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}