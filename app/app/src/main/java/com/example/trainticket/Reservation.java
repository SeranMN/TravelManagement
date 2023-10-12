package com.example.trainticket;

public class Reservation {
    private String id;
    private String traveler;
    private String train;
    private String date;
    private String aravingTime;

    private String from;
    private String to;

    public Reservation(String traveler, String train, String date, String aravingTime, String from, String to) {

        this.traveler = traveler;
        this.train = train;
        this.date = date;
        this.aravingTime = aravingTime;
        this.from= from;
        this.to = to;
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
        return aravingTime;
    }

    public void setAravingTime(String aravingTime) {
        this.aravingTime = aravingTime;
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
