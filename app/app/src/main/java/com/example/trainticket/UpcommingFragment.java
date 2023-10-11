package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class UpcommingFragment extends Fragment {

    RecyclerView recyclerView;
    private RecyclerView.LayoutManager layoutManager;

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);


    public UpcommingFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_upcomming, container, false);

        recyclerView = view.findViewById(R.id.upcoming_re_view);

        recyclerView.setHasFixedSize(true); // Optional, improves performance if the size of the RecyclerView won't change

        layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);

        apiService.getUpcoming().enqueue(new Callback<List<Reservation>>() {
            @Override
            public void onResponse(Call<List<Reservation>> call, Response<List<Reservation>> response) {
                if(response.isSuccessful()){
                    List<Reservation> reservations = response.body();
                    UpcommingAdapter upcommingAdapter = new UpcommingAdapter(reservations);
                    recyclerView.setAdapter(upcommingAdapter);
                    ItemTouchHelper itemTouchHelper = new ItemTouchHelper(new SwipeToDeleteCallback(upcommingAdapter));
                    itemTouchHelper.attachToRecyclerView(recyclerView);

                }else {
                    Log.e(TAG,"Error Occurred in onResponse : "+ response.message() );
                }
            }

            @Override
            public void onFailure(Call<List<Reservation>> call, Throwable t) {
                Log.e(TAG,"Error Occurred  : "+ t );
            }
        });
        return view;
    }
}