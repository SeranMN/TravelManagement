package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignupActivity extends AppCompatActivity {

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        TextView name = findViewById(R.id.username);
        TextView nic =  findViewById(R.id.nic);
        TextView email = findViewById(R.id.email);
        TextView phoneNo = findViewById(R.id.phoneNo);
        TextView pwd = findViewById(R.id.password);
        TextView rePwd = findViewById(R.id.repassword);

        if(rePwd.equals(pwd)){
            User newUser = new User(nic.toString(), name.toString(), email.toString(), phoneNo.toString(),"Traveler",pwd.toString(),true);
            Call <User> call = apiService.CreateUser(newUser);

            call.enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if(response.isSuccessful()){
                        Toast toast = Toast.makeText(getApplicationContext(), "User has been created successfully ", Toast.LENGTH_SHORT);
                        toast.show();
                    }
                }

                @Override
                public void onFailure(Call<User> call, Throwable t) {
                    Toast toast = Toast.makeText(getApplicationContext(), "Error in User Creating ", Toast.LENGTH_SHORT);
                    toast.show();
                    Log.e(TAG,t.getMessage());
                }
            });
        }else{
            Toast toast = Toast.makeText(getApplicationContext(), "Password Miss match ", Toast.LENGTH_SHORT);
            toast.show();
        }
    }
}