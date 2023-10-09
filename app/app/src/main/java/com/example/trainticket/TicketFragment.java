package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.os.AsyncTask;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.tabs.TabLayout;

import java.io.IOException;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link TicketFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class TicketFragment extends Fragment {

    private RecyclerView recyclerView;
    private TrainAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);



    public TicketFragment() {

    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_ticket, container, false);
        recyclerView = view.findViewById(R.id.train_re_view);

        recyclerView.setHasFixedSize(true); // Optional, improves performance if the size of the RecyclerView won't change

        layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);

        apiService.getTrains().enqueue(new Callback<List<Train>>() {
            @Override
            public void onResponse(Call<List<Train>> call, Response<List<Train>> response) {
                if(response.isSuccessful()){
                    List<Train> trains = response.body();

                    TrainAdapter trainAdapter = new TrainAdapter(trains);
                    recyclerView.setAdapter(trainAdapter);


                }else{
                    Log.e(TAG,"Error Occured in onResponse : "+ response.message() );
                }
            }

            @Override
            public void onFailure(Call<List<Train>> call, Throwable t) {
                Log.e(TAG,"Error Occured onFailure : "+ t );
            }
        });

        return view;

    }


}