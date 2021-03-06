package com.qrcode_scanner.components.qrview

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.PointF
import android.support.v4.content.ContextCompat
import android.util.AttributeSet
import android.util.Log
import android.view.SurfaceHolder
import android.view.View
import android.widget.Toast
import com.dlazaro66.qrcodereaderview.QRCodeReaderView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.qrcode_scanner.components.Component
import hugo.weaving.DebugLog


/**
 * Created by swei on 2/11/17.
 */

class QrView : QRCodeReaderView, Component, QRCodeReaderView.OnQRCodeReadListener {
    @DebugLog
    override fun onQRCodeRead(text: String?, points: Array<out PointF>?) {
        val message = text ?: "empty"
        Log.d(TAG, "onQRCodeRead:" + message)
        val event = Arguments.createMap()
        event.putString("message", message)
        val reactContext = context as ReactContext
        reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(
                id,
                "topChange",
                event)
    }

    val TAG = getLogTag(this)
    private val CAM_PERM_ERROR_MSG = "Failed to get camera permission"

    constructor(context: Context) : super(context) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init()
    }

    private fun init() {
        setOnQRCodeReadListener(this)

        // Use this function to enable/disable decoding
        setQRDecodingEnabled(true)

        // Use this function to change the autofocus interval (default is 5 secs)
        setAutofocusInterval(5000L)

        // Use this function to enable/disable Torch
        setTorchEnabled(true)

        // Use this function to set front camera preview
//        setFrontCamera()

        // Use this function to set back camera preview
        setBackCamera()

    }

    private fun hasCamPerm(): Boolean {
        return ContextCompat.checkSelfPermission(context,
                Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED
    }

    override fun surfaceCreated(holder: SurfaceHolder?) {
        if (hasCamPerm()) {
            super.surfaceCreated(holder)
        } else {
            toast(context, CAM_PERM_ERROR_MSG)
        }
    }

    @DebugLog
    override fun onVisibilityChanged(changedView: View, visibility: Int) {
        super.onVisibilityChanged(changedView, visibility)
        try {
            if (hasCamPerm()) {
                if (visibility == View.VISIBLE) {
                    //onResume called
                    startCamera()
                } else {
                    // onPause() called
                    stopCamera()
                }
            } else {
                toast(context, CAM_PERM_ERROR_MSG)
            }
        } catch (e: Exception) {
            Log.e(TAG, e.message, e)
            Toast.makeText(context, e.message, Toast.LENGTH_SHORT).show()
        }
    }
}
