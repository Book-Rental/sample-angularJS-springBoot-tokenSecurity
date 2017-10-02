package com.veosaf.bookRental.resources.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import com.veosaf.bookRental.dto.UserDto;
import com.veosaf.bookRental.resources.UserResource;
import com.veosaf.bookRental.services.UserService;

public class UserResourceImpl implements UserResource {

	@Inject
	private UserService userService;

	@Override
	public Response getByCredentials(String username, String password) {

		UserDto userDto = userService.getByCredentials(username, password);
		return Response.ok(userDto).build();
	}

	@Override
	public Response findAll() {
		List<UserDto> usersDto = userService.findAllUsersDto();
		return Response.ok(usersDto).build();
	}

}
