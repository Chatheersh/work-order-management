package com.workorder.controller;

import com.workorder.dto.WorkOrderTaskRequest;
import com.workorder.model.WorkOrderTask;
import com.workorder.service.WorkOrderTaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-order-tasks")
public class WorkOrderTaskController {

    private final WorkOrderTaskService taskService;

    public WorkOrderTaskController(WorkOrderTaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderTask>> getAll(@RequestParam(required = false) Long workOrderId) {
        if (workOrderId != null) {
            return ResponseEntity.ok(taskService.findByWorkOrderId(workOrderId));
        }
        return ResponseEntity.ok(taskService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrderTask> getById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.findById(id));
    }

    @PostMapping
    public ResponseEntity<WorkOrderTask> create(@Valid @RequestBody WorkOrderTaskRequest request) {
        WorkOrderTask created = taskService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkOrderTask> update(@PathVariable Long id, @Valid @RequestBody WorkOrderTaskRequest request) {
        return ResponseEntity.ok(taskService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
