package com.JavaProject.EMS.service.impl;

import com.JavaProject.EMS.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.JavaProject.EMS.dto.EmployeeDto;
import com.JavaProject.EMS.entity.Employee;
import com.JavaProject.EMS.mapper.EmployeeMapper;
import com.JavaProject.EMS.repository.EmployeeRepository;
import com.JavaProject.EMS.service.EmployeeService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl  implements EmployeeService{

	private EmployeeRepository employeeRepository;
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found  with Id :" + employeeId));

		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List <EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
		Employee employee =employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("No Employee :"+ employeeId));
		employee.setFirstname(updatedEmployee.getFirstname());
		employee.setLastname(updatedEmployee.getLastname());
		employee.setEmail(updatedEmployee.getEmail());
		Employee updatedEmployeeObj = employeeRepository.save(employee);

		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee Not Exist :" + employeeId));
		employeeRepository.deleteById(employeeId);
	}

}
