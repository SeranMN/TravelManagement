package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.security.PrivateKey;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private String NIC;
    private String Pwd;

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        findViewById(R.id.btn_login).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText nic = findViewById(R.id.plainTxt_email);
                EditText pwd = findViewById(R.id.plainTxt_pwd);

                NIC = nic.getText().toString();
                Pwd = pwd.getText().toString();

                apiService.Login(NIC,Pwd).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        if (response.isSuccessful()) {

                            User user = response.body();
                            SharedPreferences preferences = getSharedPreferences("session_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = preferences.edit();
                            editor.putString("id", user.id);
                            editor.putString("name", user.name);
                            editor.putString("email", user.email);
                            editor.putString("phone", user.phoneNumber);
                            editor.putString("role", user.role);
                            editor.apply();

                            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(intent);


                        } else if (response.message() == "Not Found") {
                            int duration = Toast.LENGTH_SHORT;
                            Toast toast = Toast.makeText(getApplicationContext(), "User Does Not Registered", duration);
                            toast.show();
                        } else if (response.message().equals("pawssword not valid")) {

                            Toast toast = Toast.makeText(getApplicationContext(), response.message(), Toast.LENGTH_SHORT);
                            toast.show();

                        }
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                            Log.e(TAG,t.getMessage());
                    }
                });


            }
        });

        findViewById(R.id.txt_signup).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
                startActivity(intent);



            }
        });

    }
}