package com.excurrate;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MobileAds.initialize(this, "ca-app-pub-2778407729992409~5053790404");
        SplashScreen.show(this);  // here
    }

}
