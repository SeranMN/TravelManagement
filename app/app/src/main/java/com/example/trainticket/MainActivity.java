package com.example.trainticket;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.app.Activity;
import android.os.Bundle;

import com.etebarian.meowbottomnavigation.MeowBottomNavigation;
import com.example.trainticket.databinding.ActivityMainBinding;



public class MainActivity extends AppCompatActivity {

  ActivityMainBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        ReplaceFragment(new HomeFragment());

        binding.bottomNavigationView.setOnItemSelectedListener(item -> {
           int ItemID = item.getItemId();
            if(ItemID == R.id.NavHome){
                ReplaceFragment(new HomeFragment());
            } else if (ItemID == R.id.train) {
                ReplaceFragment(new TicketFragment());
            } else if (ItemID == R.id.profile) {
                ReplaceFragment(new ProfileFragment());
            }
            return true;
        });
    }
    private void ReplaceFragment (Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frameLayout, fragment);
        fragmentTransaction.commit();

    }

}