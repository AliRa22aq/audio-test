import React from 'react'

async function checkPermissions() {
    try {
        // Check microphone permission
        const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        alert(`Microphone permission state: ${micPermission.state}`);

        // Check camera permission
        const camPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        alert(`Camera permission state: ${camPermission.state}`);

        if (micPermission.state === 'granted' && camPermission.state === 'granted') {
            console.log('User has granted permission to access microphone and webcam.');
        } else if (micPermission.state === 'prompt' || camPermission.state === 'prompt') {
            console.log('User has not granted permission yet. They will be prompted.');
        } else {
            console.log('User has denied permission to access microphone or webcam.');
        }
    } catch (error) {
        alert(`Permission query failed: ${error}`);
    }
}

const permission = () => {
    return (
        <div style={{ padding: '20px' }}>
            <button onClick={checkPermissions}> Check Permission </button>
        </div>
    )
}

export default permission