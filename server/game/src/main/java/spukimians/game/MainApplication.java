package spukimians.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class MainApplication {

	@GetMapping(value="/spukimians")
	public String getMethodName() {
		return "spukimians";
	}
	

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}

}
