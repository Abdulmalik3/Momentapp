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
        Appodeal.initialize(this, "c67db1393858aa8d788656286272ea6adc08514708423076", Appodeal.BANNER, new ApdInitializationCallback() {
            @Override
            public void onInitializationFinished(@Nullable List<ApdInitializationError> errors) {
                // Appodeal initialization finished
            }
        });

        Appodeal.show(this, Appodeal.BANNER_TOP);

    }


}
