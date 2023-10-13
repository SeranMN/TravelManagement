package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.app.DatePickerDialog;
import android.nfc.Tag;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ReservationUpdateFragment extends Fragment {

    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    private Reservation reservation = new Reservation() ;
    private RecyclerView.LayoutManager layoutManager;
    private Schedule slectedSchedule;
    DatePickerDialog datePicker;

    String Date;

    public ReservationUpdateFragment() {
        // Required empty public constructor
    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_reservation_update, container, false);
        Bundle args = getArguments();
        if (args != null) {
            reservation.setId(args.getString("ReservationId"));
            reservation.setFrom(args.getString("ReservationFrom")) ;
            reservation.setDate(args.getString("ReservationDate"));
            reservation.setTo(args.getString("ReservationTo"));
        }

        Spinner from = view.findViewById(R.id.spinner_from);
        Spinner to = view.findViewById(R.id.spinner_to);
        TextView date = view.findViewById(R.id.textView_date);
        Spinner count = view.findViewById(R.id.spinner_count);

        ArrayAdapter<String> adapter = (ArrayAdapter<String>) from.getAdapter();
        for (int i = 0; i < adapter.getCount(); i++) {
            if (adapter.getItem(i).equals(reservation.getFrom())) {
                from.setSelection(i);
                break; // Exit the loop once the item is found and selected
            }
        }

        ArrayAdapter<String> toAdapter = (ArrayAdapter<String>) to.getAdapter();
        for (int i = 0; i < toAdapter.getCount(); i++) {
            if (toAdapter.getItem(i).equals(reservation.getTo())) {
                to.setSelection(i);
                break; // Exit the loop once the item is found and selected
            }
        }

        ArrayAdapter<String> countAdapter = (ArrayAdapter<String>) count.getAdapter();
        for (int i = 0; i < countAdapter.getCount(); i++) {
            if (countAdapter.getItem(i).equals(reservation.getTo())) {
                count.setSelection(i);
                break; // Exit the loop once the item is found and selected
            }
        }

        date.setText(reservation.getDate());

        RecyclerView recyclerView = view.findViewById(R.id.schedule_re_view);

        recyclerView.setHasFixedSize(true);

        layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);

        Button button = view.findViewById(R.id.button_findTrain);

        Button done = view.findViewById(R.id.button_done);



        from.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                reservation.setFrom(adapterView.getItemAtPosition(i).toString());
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        to.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                reservation.setTo(adapterView.getItemAtPosition(i).toString());
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                apiService.getSchedules(reservation.getFrom(),reservation.getTo()).enqueue(new Callback<List<Schedule>>() {
                    @Override
                    public void onResponse(Call<List<Schedule>> call, Response<List<Schedule>> response) {
                        if (response.isSuccessful()) {
                            List<Schedule> schedules = response.body();

                            ScheduleAdapter scheduleAdapter = new ScheduleAdapter(schedules, new ScheduleAdapter.OnItemClickListener() {
                                @Override
                                public void onItemClick(Schedule schedule, int position) {
                                    slectedSchedule = schedule;
                                }
                            });
                            recyclerView.setAdapter(scheduleAdapter);
                        }else{
                            Log.e(TAG,"Error Occurred : "+ response.message() );
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Schedule>> call, Throwable t) {
                        Log.e(TAG,"Error Occurred : "+ t );
                    }
                });
            }
        });





        date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Calendar c = Calendar.getInstance();
                int year = c.get(Calendar.YEAR);
                int Month = c.get(Calendar.MONTH);
                int Day = c.get(Calendar.DAY_OF_MONTH);

                c.add(Calendar.DAY_OF_MONTH, 30);
                int maxYear = c.get(Calendar.YEAR);
                int maxMonth = c.get(Calendar.MONTH);
                int maxDay = c.get(Calendar.DAY_OF_MONTH);

                datePicker = new DatePickerDialog(getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        i1++;
                        Date = String.format("%02d/%02d/%d", i2, i1, i);
                        reservation.setDate(Date);

                        date.setText(Date);
                    }
                },year,Month,Day);
                // Set the minimum date to today
                datePicker.getDatePicker().setMinDate(Calendar.getInstance().getTimeInMillis());

                // Set the maximum date to 30 days from today
                datePicker.getDatePicker().setMaxDate(c.getTimeInMillis());

                datePicker.show();
            }
        });
        done.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Call<Void> call = apiService.updateReservation(reservation.getId(),reservation);

               call.enqueue(new Callback<Void>() {
                   @Override
                   public void onResponse(Call<Void> call, Response<Void> response) {
                       if(response.isSuccessful()){
                           Log.i(TAG,"Update Successfully");
                       }else {
                           Log.e(TAG,response.message());
                       }

                   }

                   @Override
                   public void onFailure(Call<Void> call, Throwable t) {
                       Log.e(TAG, t.getMessage());
                   }
               });
            }});




     return view;
    }
}