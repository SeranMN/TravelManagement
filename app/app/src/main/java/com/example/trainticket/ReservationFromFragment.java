package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.app.DatePickerDialog;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.util.Calendar;
public class ReservationFromFragment extends Fragment {

    private RecyclerView.LayoutManager layoutManager;
    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
    String sFrom;
    String sTo;
    DatePickerDialog datePicker;
    Reservation reservation;
    String Date;
    private Schedule slectedSchedule;
    public ReservationFromFragment() {

    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_reservation_from, container, false);

        RecyclerView recyclerView = view.findViewById(R.id.schedule_re_view);

        recyclerView.setHasFixedSize(true);

        layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);

        Button button = view.findViewById(R.id.button_findTrain);
        Spinner from = view.findViewById(R.id.spinner_from);
        Spinner to = view.findViewById(R.id.spinner_to);
        Button done = view.findViewById(R.id.button_done);


        from.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                sFrom = adapterView.getItemAtPosition(i).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        to.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                sTo = adapterView.getItemAtPosition(i).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                apiService.getSchedules(sFrom,sTo).enqueue(new Callback<List<Schedule>>() {
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




        TextView dateText = view.findViewById(R.id.textView_date);

        dateText.setOnClickListener(new View.OnClickListener() {
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

                        dateText.setText(Date);
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
                ConfirmFragment fragment = new ConfirmFragment();
                Bundle bundle = new Bundle();

                bundle.putString("ReservationDate", Date);
                bundle.putString("ReservationFrom", sFrom);
                bundle.putString("ReservationTo", sTo);
                bundle.putString("trainId", slectedSchedule.getTrainId());

                fragment.setArguments(bundle);
                getFragmentManager()
                        .beginTransaction()
                        .replace(R.id.frameLayout,fragment)
                        .addToBackStack(null)
                        .commit();

            }
        });

        return view;
    }



}