package com.workorder.service;

import com.workorder.dto.WorkOrderRequest;
import com.workorder.model.WorkOrder;
import com.workorder.repository.WorkOrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository repository;

    public WorkOrderServiceImpl(WorkOrderRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<WorkOrder> findAll() {
        return repository.findAll();
    }

    @Override
    public WorkOrder findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Work order not found with id: " + id));
    }

    @Override
    public WorkOrder create(WorkOrderRequest request) {
        WorkOrder workOrder = new WorkOrder();
        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setStatus(request.getStatus());
        workOrder.setPriority(request.getPriority());
        workOrder.setAssignee(request.getAssignee());
        return repository.save(workOrder);
    }

    @Override
    public WorkOrder update(Long id, WorkOrderRequest request) {
        WorkOrder existing = findById(id);
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setStatus(request.getStatus());
        existing.setPriority(request.getPriority());
        existing.setAssignee(request.getAssignee());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        WorkOrder workOrder = findById(id);
        repository.delete(workOrder);
    }
}
