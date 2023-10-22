package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class UserEditFragment extends Fragment {
    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    public UserEditFragment() {
        // Required empty public constructor
    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        SharedPreferences preferences = getActivity().getSharedPreferences("session_data", Context.MODE_PRIVATE);
        View view = inflater.inflate(R.layout.fragment_user_edit, container, false);

        String userId = preferences.getString("id", "");
        String Name = preferences.getString("name","");
        String Email = preferences.getString("email","");
        String phone = preferences.getString("phone","");

        TextView name = view.findViewById(R.id.username);
        TextView nic =  view.findViewById(R.id.nic);
        TextView email = view.findViewById(R.id.email);
        TextView phoneNo = view.findViewById(R.id.phoneNo);
        Button btn = view.findViewById(R.id.userUpdate);

        name.setText(Name);
        nic.setText(userId);
        email.setText(Email);
        phoneNo.setText(phone);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                User updateUser = new User(nic.toString(),name.toString(),email.toString(),phoneNo.toString());

                apiService.UpdateUser(userId,updateUser).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        Toast.makeText(getContext(), "User Updated Successfully", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        Log.e(TAG,t.getMessage());
                    }
                });
            }
        });


        return view;
    }
}