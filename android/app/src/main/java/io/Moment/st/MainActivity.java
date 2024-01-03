package io.Moment.st;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.appodeal.ads.Appodeal;
import com.appodeal.ads.initializing.ApdInitializationCallback;
import com.appodeal.ads.initializing.ApdInitializationError;
import com.getcapacitor.BridgeActivity;

import java.util.List;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Appodeal.initialize(this, "9ccfce4351a2848a44c67a3d233e498a362ed49600aa1d00", Appodeal.BANNER, new ApdInitializationCallback() {
            @Override
            public void onInitializationFinished(@Nullable List<ApdInitializationError> errors) {
                // Appodeal initialization finished
            }
        });
        Appodeal.show(this, Appodeal.BANNER_TOP);

    }


}
