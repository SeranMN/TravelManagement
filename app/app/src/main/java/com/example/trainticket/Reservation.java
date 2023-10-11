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

    public String getId() {
        return id;
    }

    public String getTraveler() {
        return traveler;
    }

    public String getTrain() {
        return train;
    }

    public String getDate() {
        return date;
    }

    public String getAravingTime() {
        return aravingTime;
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
