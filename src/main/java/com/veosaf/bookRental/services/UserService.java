package com.veosaf.bookRental.services;

import com.veosaf.bookRental.dto.UserDto;

public interface UserService {

	UserDto getByCredentials(String username, String password);
}
