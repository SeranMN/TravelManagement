package com.example.trainticket;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.ViewHolder> {

    private List<Reservation> pastReservations;

    public  HistoryAdapter (List <Reservation> reservations){
        this.pastReservations = reservations;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public HistoryAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.histroy_recycle, parent, false);
        return new HistoryAdapter.ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull HistoryAdapter.ViewHolder holder, int position) {
        Reservation reservation = pastReservations.get(position);
        holder.dateTextView.setText("Date: "+ reservation.getDate());
        holder.timeTextView.setText("Time: "+reservation.getArivingTime());
        holder.fromTextView.setText("From: "+reservation.getFrom());
        holder.toTexTView.setText("To: "+reservation.getTo());
        ;
    }

    @Override
    public int getItemCount() {
        return pastReservations != null ? pastReservations.size() : 0;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView dateTextView;
        TextView timeTextView;
        TextView fromTextView;
        TextView toTexTView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            dateTextView = itemView.findViewById(R.id.textViewDate);
            timeTextView = itemView.findViewById(R.id.textViewTime);
            fromTextView = itemView.findViewById(R.id.TextViewArriving);
            toTexTView = itemView.findViewById(R.id.textViewDep);

        }
    }


}
