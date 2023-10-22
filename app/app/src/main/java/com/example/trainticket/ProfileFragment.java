package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.nfc.Tag;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.prefs.Preferences;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ProfileFragment extends Fragment {

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    private Activity parentActivity = getActivity();





    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        SharedPreferences preferences = getActivity().getSharedPreferences("session_data", Context.MODE_PRIVATE);
        String userId = preferences.getString("id", "");
        String Name = preferences.getString("name","");
        String Email = preferences.getString("email","");


        TextView name = view.findViewById(R.id.textView_name);
        name.setText(Name);
        TextView email = view.findViewById(R.id.textView_email);
        email.setText(Email);
        LinearLayout deactivate = view.findViewById(R.id.deActivate);
        LinearLayout logout = view.findViewById(R.id.logout);

        deactivate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DeactivateAccount(userId);
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Logout();
            }
        });

        Button editBtn = view.findViewById(R.id.editBtn);
        editBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ChangeEditFragment();
            }
        });



        return view;
    }

    private void DeactivateAccount(String id){
        apiService.DeactivateUser(id).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(response.isSuccessful()){
                    Intent intent = new Intent(parentActivity, LoginActivity.class);
                    startActivity(intent);

                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG,t.getMessage());
            }
        });
    }

    private void Logout(){
        Intent intent = new Intent(parentActivity, LoginActivity.class);
        startActivity(intent);
    }

    private void ChangeEditFragment(){
        UserEditFragment fragment = new UserEditFragment();
        FragmentManager fragmentManager = getParentFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frameLayout,fragment);
        fragmentTransaction.commit();
    }
}