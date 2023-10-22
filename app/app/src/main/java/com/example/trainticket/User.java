package com.example.trainticket;

public class User {
    public String id;

    public String name;

    public String email;

    public String phoneNumber;

    public String role;

    public String password ;

    public Boolean status;

    public User(String id, String name, String email, String phoneNumber, String role, String password, Boolean status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.password = password;
        this.status = status;
    }

    public User(String id, String name, String email, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
