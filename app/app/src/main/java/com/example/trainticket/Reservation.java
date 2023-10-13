package com.example.trainticket;

public class Reservation {
    private String id;
    private String traveler;
    private String train;
    private String date;
    private String arivingTime;

    private String from;
    private String to;
    private String createdBy;
    private String count;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public Reservation(String traveler, String train, String date, String aravingTime, String from, String to, String createdBy, String Count) {

        this.traveler = traveler;
        this.train = train;
        this.date = date;
        this.arivingTime = aravingTime;
        this.from= from;
        this.to = to;
        this.createdBy = createdBy;
        this. count = Count;
    }
    public Reservation(){

    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTraveler() {
        return traveler;
    }

    public void setTraveler(String traveler) {
        this.traveler = traveler;
    }

    public String getTrain() {
        return train;
    }

    public void setTrain(String train) {
        this.train = train;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAravingTime() {
        return arivingTime;
    }

    public void setAravingTime(String aravingTime) {
        this.arivingTime = aravingTime;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
