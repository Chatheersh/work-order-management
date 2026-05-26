package com.fiix.workorder.controller;

import com.fiix.workorder.dto.WorkOrderDto;
import com.fiix.workorder.model.WorkOrderStatus;
import com.fiix.workorder.service.WorkOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {

    private final WorkOrderService service;

    public WorkOrderController(WorkOrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<WorkOrderDto> getAll(
            @RequestParam(required = false) WorkOrderStatus status) {
        if (status != null) {
            return service.findByStatus(status);
        }
        return service.findAll();
    }

    @GetMapping("/{id}")
    public WorkOrderDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<WorkOrderDto> create(@Valid @RequestBody WorkOrderDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public WorkOrderDto update(@PathVariable Long id, @Valid @RequestBody WorkOrderDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
