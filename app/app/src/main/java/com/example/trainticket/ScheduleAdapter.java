package com.example.trainticket;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class ScheduleAdapter extends RecyclerView.Adapter<ScheduleAdapter.ViewHolder> {

    private List<Schedule> schedules;
    private int selectedItemPosition = RecyclerView.NO_POSITION;
    private OnItemClickListener listener;
    public interface OnItemClickListener {
        void onItemClick(Schedule schedule, int position);
    }

    public  ScheduleAdapter (List <Schedule> schedules, OnItemClickListener onItemClickListener){
        this.schedules = schedules;
        this.listener = onItemClickListener;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ScheduleAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.schedule_recycle, parent, false);
        return new ScheduleAdapter.ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull ScheduleAdapter.ViewHolder holder, int position) {
        Schedule schedule = schedules.get(position);
        holder.arrivingTime.setText("Arriving: "+schedule.getArivingTime());
        holder.departureTime.setText("Departure: "+schedule.getDepatureTime());
        holder.start.setText(schedule.getStart()+" to ");
        holder.end.setText( schedule.getEnd());
        holder.itemView.setOnClickListener(v -> {
            if (listener!= null) {
                listener.onItemClick(schedule, position);
            }
            int previousSelectedItemPosition = selectedItemPosition;
            selectedItemPosition = position;

            // Notify the adapter of item changes to update the background colors
            notifyItemChanged(previousSelectedItemPosition);
            notifyItemChanged(selectedItemPosition);

            // Handle item click here
            // You can access the selected item's data using 'schedule' object
            // For example, display a toast with the selected schedule name:
            // Toast.makeText(holder.itemView.getContext(), "Selected schedule: " + schedule.getScheduleName(), Toast.LENGTH_SHORT).show();
        });

        // Update the background color based on the selected status
        if (position == selectedItemPosition) {
            holder.itemView.setBackgroundColor(Color.parseColor("#c8c8fe"));
        } else {
            holder.itemView.setBackgroundColor(Color.TRANSPARENT); // Set the default background color
        }
    }

    @Override
    public int getItemCount() {
        return schedules != null ? schedules.size() : 0;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView arrivingTime;
        TextView departureTime;
        TextView start;
        TextView end;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            arrivingTime = itemView.findViewById(R.id.arrivingTextView);
            departureTime = itemView.findViewById(R.id.textViewDepTime);
            start = itemView.findViewById(R.id.textView_start);
            end = itemView.findViewById(R.id.textView_end);

        }
    }
}
