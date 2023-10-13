package com.example.trainticket;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.trainticket.databinding.ActivityMainBinding;

/**
 * A simple {@link Fragment} subclass.

 * create an instance of this fragment.
 */
public class HomeFragment extends Fragment {


    public HomeFragment() {
        // Required empty public constructor
    }



    // TODO: Rename and change types and number of parameters


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        SharedPreferences preferences = getActivity().getSharedPreferences("session_data", Context.MODE_PRIVATE);

        TextView name = view.findViewById(R.id.textView_homeName);
        LinearLayout newButton = view.findViewById(R.id.buttton_New);
        LinearLayout histroyButton = view.findViewById(R.id.btn_history);
        LinearLayout upButton = view.findViewById(R.id.btn_up);
        name.setText(preferences.getString("name", ""));
        newButton.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                ReservationFromFragment reservationFromFragment = new ReservationFromFragment();
                FragmentManager fragmentManager = getParentFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frameLayout,reservationFromFragment);
                fragmentTransaction.commit();

            }
        });

        histroyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                HistoryFragment historyFragment = new HistoryFragment();
                FragmentManager fragmentManager = getParentFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frameLayout,historyFragment);
                fragmentTransaction.commit();
            }
        });

        upButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                UpcommingFragment upcommingFragment = new UpcommingFragment();
                FragmentManager fragmentManager = getParentFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frameLayout,upcommingFragment);
                fragmentTransaction.commit();
            }
        });

        return  view;
    }
}