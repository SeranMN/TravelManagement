package com.example.trainticket;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UpcommingAdapter extends RecyclerView.Adapter<UpcommingAdapter.ViewHolder>{
    private List<Reservation> upcommingReservations;
    private OnItemClickListener listener;
    private ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);

    public  UpcommingAdapter (List <Reservation> reservations){
        this.upcommingReservations = reservations;
        notifyDataSetChanged();
    }
    public interface OnItemClickListener {
        void onItemClick(int position);
    }
    public void removeItem(int position) {

       Call<Void> call =  apiService.deleteUpcoming(upcommingReservations.get(position).getId());
       call.enqueue(new Callback<Void>() {
           @Override
           public void onResponse(Call<Void> call, Response<Void> response) {
               if (response.isSuccessful()) {
                   upcommingReservations.remove(position);
                   notifyItemRemoved(position);
                   Log.i(TAG," : "+ response.message() );
               } else {

                   Log.e(TAG,"Error Occurred in onResponse : "+ response.message() );
                   // Handle the error accordingly
               }
           }

           @Override
           public void onFailure(Call<Void> call, Throwable t) {
               Log.e(TAG,"Error Occurred  : "+ t );
           }
       });
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        this.listener = listener;
    }

    @NonNull
    @Override
    public UpcommingAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.upcomming_recycle, parent, false);
        return new UpcommingAdapter.ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull UpcommingAdapter.ViewHolder holder, int position) {
        Reservation reservation = upcommingReservations.get(position);
        holder.dateTextView.setText("Date: "+ reservation.getDate());
        holder.timeTextView.setText("Time: "+reservation.getArivingTime());
        holder.fromTextView.setText("From: "+reservation.getFrom());
        holder.toTexTView.setText("To: "+reservation.getTo());
        ;
    }

    @Override
    public int getItemCount() {
        return upcommingReservations != null ? upcommingReservations.size() : 0;
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
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (listener != null) {
                        int position = getAdapterPosition();
                        if (position != RecyclerView.NO_POSITION) {
                            listener.onItemClick(position);
                        }
                    }
                }
            });

        }

    }

}
