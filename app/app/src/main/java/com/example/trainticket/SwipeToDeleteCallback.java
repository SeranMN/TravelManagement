package com.example.trainticket;

import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

public class SwipeToDeleteCallback extends ItemTouchHelper.SimpleCallback {

    private final UpcommingAdapter adapter;

    public SwipeToDeleteCallback(UpcommingAdapter adapter) {
        super(0, ItemTouchHelper.LEFT);
        this.adapter = adapter;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
        return false;
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        // Remove the item from the data source
        int position = viewHolder.getAdapterPosition();
        adapter.removeItem(position);

        // Notify the adapter of the change
        adapter.notifyItemRemoved(position);
    }
}

