package com.JavaProject.EMS.service;

import com.JavaProject.EMS.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
   public EmployeeDto createEmployee(EmployeeDto employeeDto) ;
   EmployeeDto getEmployeeById(Long employeeId);

   List<EmployeeDto> getAllEmployees();

   EmployeeDto updateEmployee(Long employeeId , EmployeeDto updatedEmployee);

   void deleteEmployee (Long employeeId);
}
