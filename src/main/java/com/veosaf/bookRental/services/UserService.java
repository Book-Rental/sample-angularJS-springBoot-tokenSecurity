package com.veosaf.bookRental.services;

import java.util.List;

import com.veosaf.bookRental.dto.UserDto;
import com.veosaf.bookRental.models.User;

public interface UserService {

	UserDto getByCredentials(String username, String password);

	User getById(Long id);

	List<UserDto> findAllUsersDto();
}
