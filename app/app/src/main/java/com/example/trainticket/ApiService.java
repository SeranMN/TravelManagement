package com.example.trainticket;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @GET("/api/Train/") // Replace with your API endpoint
    Call<List<Train>> getTrains();

    @GET("/tour?")
    Call<List<Schedule>> getSchedules(
            @Query("from") String param1,
            @Query("to") String param2
    );

    @POST("/api/Reservation")
    Call<Reservation> createReservation(@Body Reservation reservation);

    @GET("/getHistory")
    Call<List<Reservation>> getHistory();

    @GET("/getUpcoming")
    Call<List<Reservation>> getUpcoming();

    @DELETE("/api/Reservation/{id}")
    Call<Void> deleteUpcoming(@Path("id") String id);
}
