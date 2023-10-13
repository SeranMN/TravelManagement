package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

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


public class ConfirmFragment extends Fragment {

    private Reservation reservation = new Reservation();
    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);

    public ConfirmFragment() {
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
        View view = inflater.inflate(R.layout.fragment_confirm, container, false);
        Bundle args = getArguments();
        if (args != null) {

            reservation.setFrom(args.getString("ReservationFrom")) ;
            reservation.setDate(args.getString("ReservationDate"));
            reservation.setTo(args.getString("ReservationTo"));
            reservation.setId(args.getString("trainId"));
            reservation.setCount(args.getString("count"));
            reservation.setAravingTime(args.getString("time"));
        }

        TextView start = view.findViewById(R.id.textView_startStation);
        TextView end = view.findViewById(R.id.textView_endStation);
        TextView time = view.findViewById(R.id.textView_ArivingTime);
        TextView date = view.findViewById(R.id.textView_Date);
        TextView count = view.findViewById(R.id.textViewCount);

        Button confirm = view.findViewById(R.id.button_confirm);
        Button cancel = view.findViewById(R.id.button_cancel);

        start.setText(reservation.getFrom());
        end.setText(reservation.getTo());
        time.setText(reservation.getAravingTime());
        date.setText(reservation.getDate());

        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences preferences = getActivity().getSharedPreferences("session_data", Context.MODE_PRIVATE);
                String userId = preferences.getString("id", "");

                Reservation newReservation = new Reservation(userId,"train",reservation.getDate(),reservation.getAravingTime(),reservation.getFrom(),reservation.getTo(),userId,reservation.getCount());
                Call<Reservation> call = apiService.createReservation(newReservation);

                call.enqueue(new Callback<Reservation>() {
                    @Override
                    public void onResponse(Call<Reservation> call, Response<Reservation> response) {
                        if(response.isSuccessful()){
                            Toast.makeText(getContext(),"Reservation Successfully added", Toast.LENGTH_SHORT);
                            Log.i(TAG,"Successfully added: "+response.message());
                        }else {
                            Log.e(TAG,"Error Occurred: "+response.message());
                        }
                    }

                    @Override
                    public void onFailure(Call<Reservation> call, Throwable t) {
                        Log.e(TAG,"Error Occurred: "+t);
                    }
                });
            }
        });

        cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ReservationFromFragment reservationFromFragment = new ReservationFromFragment();
                FragmentManager fragmentManager = getParentFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frameLayout,reservationFromFragment);
                fragmentTransaction.commit();
            }
        });


        return view;
    }
}