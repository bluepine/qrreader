package com.qrcode_scanner.components

import android.content.Context
import android.widget.Toast

/**
 * Created by swei on 2/11/17.
 */

interface Component {
    fun getLogTag(o: Any): String {
        return o.javaClass.canonicalName.split('.').last()
    }

    fun toast(context: Context, msg: String) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
    }
}
