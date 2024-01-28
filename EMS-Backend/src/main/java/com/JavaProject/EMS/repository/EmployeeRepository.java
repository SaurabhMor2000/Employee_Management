package com.JavaProject.EMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JavaProject.EMS.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    void deleteById(Long employeeId);
}
