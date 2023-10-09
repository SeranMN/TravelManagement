package com.example.trainticket;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiService {
    @GET("/api/Train/") // Replace with your API endpoint
    Call<List<Train>> getTrains();
}
