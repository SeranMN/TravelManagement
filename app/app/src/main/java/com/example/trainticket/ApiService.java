package com.example.trainticket;
import java.util.List;
import retrofit2.Call;
import retrofit2.CallAdapter;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @GET("/api/Train/") // Replace with your API endpoint
    Call<List<Train>> getTrains();

    @GET("api/Schedule/tour")
    Call<List<Schedule>> getSchedules(
            @Query("from") String param1,
            @Query("to") String param2
    );

    @POST("/api/Reservation")
    Call<Reservation> createReservation(@Body Reservation reservation);

    @GET("api/Reservation/getHistory")
    Call<List<Reservation>> getHistory();

    @GET("api/Reservation/getUpcoming/{id}")
    Call<List<Reservation>> getUpcoming(@Path("id") String id);

    @DELETE("/api/Reservation/{id}")
    Call<Void> deleteUpcoming(@Path("id") String id);

    @PUT("/api/Reservation/{id}")
    Call<Void> updateReservation(@Path("id") String id, @Body Reservation body);

    @GET("api/User/{id}")
    Call <User> Login (@Path("id") String id,@Query("password") String pwd);

    @POST("api/User")
    Call <User> CreateUser (@Body User user);

    @PUT("api/User/deactivate/{id}")
    Call <User> DeactivateUser (@Path("id")String id);

    @PUT("api/User/{id}")
    Call <User> UpdateUser (@Path("id") String id,@Body User user );


}
