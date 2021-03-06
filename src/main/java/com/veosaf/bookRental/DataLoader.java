package com.veosaf.bookRental;

import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.veosaf.bookRental.models.Book;
import com.veosaf.bookRental.models.Rental;
import com.veosaf.bookRental.models.User;
import com.veosaf.bookRental.models.UserCredential;
import com.veosaf.bookRental.repository.BookRepository;
import com.veosaf.bookRental.repository.RentalRepository;
import com.veosaf.bookRental.repository.UserCredentialRepository;
import com.veosaf.bookRental.repository.UserRepository;

@Component
public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

	private static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);

	@Inject
	private BookRepository bookRepository;

	@Inject
	private UserRepository userRepository;

	@Inject
	private RentalRepository rentalRepository;

	@Inject
	private UserCredentialRepository userCredentialRepository;

	private Set<Long> bookIds = new HashSet<Long>(0);
	private Set<Long> userIds = new HashSet<Long>(0);

	@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		addBooks();
		addUsers();
		addRentals();
	}

	private void addBooks() {
		Book book = new Book();
		book.setTitle("Java Book");
		book.setPublicationDate(new GregorianCalendar(2000, 0, 31).getTime());
		book.setAuthor("Simon");
		book.setStockQuantity(new Long(5));
		book = bookRepository.save(book);
		bookIds.add(book.getId());

		book = new Book();
		book.setTitle("Php Book");
		book.setStockQuantity(new Long(7));
		book.setPublicationDate(new GregorianCalendar(2000, 0, 31).getTime());
		book.setAuthor("Chris");
		book = bookRepository.save(book);
		bookIds.add(book.getId());
	}

	private void addUsers() {
		User user = new User();
		user.setFirstName("John");
		user.setLastName("Jackson");
		user.setEmail("john@gmail.com");
		user = userRepository.save(user);
		userIds.add(user.getId());

		UserCredential userCredential = new UserCredential();
		user.setUserCredential(userCredential);
		userCredential.setUser(user);
		userCredential.setUsername("john");
		userCredential.setPassword("abc");
		userCredential = userCredentialRepository.save(userCredential);

		user = new User();
		user.setFirstName("Joelle");
		user.setLastName("Doe");
		user.setEmail("joelle@gmail.com");
		user = userRepository.save(user);
		userIds.add(user.getId());

		userCredential = new UserCredential();
		user.setUserCredential(userCredential);
		userCredential.setUser(user);
		userCredential.setUsername("joelle");
		userCredential.setPassword("abc");
		userCredential = userCredentialRepository.save(userCredential);

	}

	private void addRentals() {

		Iterator<Long> userIterator = userIds.iterator();
		User user1 = userRepository.getOne((Long) userIterator.next());
		User user2 = userRepository.getOne((Long) userIterator.next());

		Iterator<Long> bookIterator = bookIds.iterator();
		Book book1 = bookRepository.getOne((Long) bookIterator.next());
		Book book2 = bookRepository.getOne((Long) bookIterator.next());

		Rental rental = new Rental();
		rental.setUser(user1);
		rental.setBook(book1);
		rental.setStartDate(new GregorianCalendar(2005, 0, 31).getTime());
		rental.setEndDate(new GregorianCalendar(2005, 1, 15).getTime());
		rental.setEffectiveEndDate(null);
		rental = rentalRepository.save(rental);

		rental = new Rental();
		rental.setUser(user2);
		rental.setBook(book2);
		rental.setStartDate(new GregorianCalendar(2006, 0, 31).getTime());
		rental.setEndDate(new GregorianCalendar(2006, 1, 20).getTime());
		rental.setEffectiveEndDate(null);
		rental = rentalRepository.save(rental);

	}

}
