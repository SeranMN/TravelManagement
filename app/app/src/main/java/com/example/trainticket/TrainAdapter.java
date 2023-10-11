package com.example.trainticket;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
public class TrainAdapter extends RecyclerView.Adapter<TrainAdapter.ViewHolder> {

    private List <Train> trains;

    public  TrainAdapter (List <Train> trains){
        this.trains = trains;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public TrainAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.train_recycle, parent, false);
        return new ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull TrainAdapter.ViewHolder holder, int position) {
        Train train = trains.get(position);
        holder.nameTextView.setText(train.getName());
        ;
    }

    @Override
    public int getItemCount() {
        return trains != null ? trains.size() : 0;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView nameTextView;
        TextView descriptionTextView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTextView = itemView.findViewById(R.id.arrivingTextView);

        }
    }
}
