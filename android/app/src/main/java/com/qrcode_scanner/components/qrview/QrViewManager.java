package com.qrcode_scanner.components.qrview;

import com.dlazaro66.qrcodereaderview.QRCodeReaderView;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
public class QrViewManager extends SimpleViewManager<QRCodeReaderView> {

    public static final String REACT_CLASS = "QRView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }
    @Override
    public QRCodeReaderView createViewInstance(ThemedReactContext context) {
        return new QRCodeReaderView(context);
    }
}
