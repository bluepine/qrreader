package com.qrcode_scanner.components.qrview

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class QrViewManager : SimpleViewManager<QrView>() {
    override fun getName(): String {
        return REACT_CLASS
    }

    public override fun createViewInstance(context: ThemedReactContext): QrView {
        return QrView(context)
    }

    companion object {
        val REACT_CLASS = "QRView"
    }
}
