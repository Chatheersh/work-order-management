package com.workorder.service;

import com.workorder.dto.WorkOrderTaskRequest;
import com.workorder.model.WorkOrder;
import com.workorder.model.WorkOrderTask;
import com.workorder.repository.WorkOrderRepository;
import com.workorder.repository.WorkOrderTaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderTaskServiceImpl implements WorkOrderTaskService {

    private final WorkOrderTaskRepository taskRepository;
    private final WorkOrderRepository workOrderRepository;

    public WorkOrderTaskServiceImpl(WorkOrderTaskRepository taskRepository, WorkOrderRepository workOrderRepository) {
        this.taskRepository = taskRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public List<WorkOrderTask> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<WorkOrderTask> findByWorkOrderId(Long workOrderId) {
        return taskRepository.findByWorkOrderId(workOrderId);
    }

    @Override
    public WorkOrderTask findById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Work order task not found with id: " + id));
    }

    @Override
    public WorkOrderTask create(WorkOrderTaskRequest request) {
        WorkOrder workOrder = workOrderRepository.findById(request.getWorkOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Work order not found with id: " + request.getWorkOrderId()));

        WorkOrderTask task = new WorkOrderTask();
        task.setWorkOrder(workOrder);
        task.setDescription(request.getDescription());
        task.setCompleted(request.getCompleted() != null ? request.getCompleted() : false);
        task.setOrder(request.getOrder());
        return taskRepository.save(task);
    }

    @Override
    public WorkOrderTask update(Long id, WorkOrderTaskRequest request) {
        WorkOrderTask existing = findById(id);

        if (!existing.getWorkOrder().getId().equals(request.getWorkOrderId())) {
            // validate new work order exists and set it
            WorkOrder workOrder = workOrderRepository.findById(request.getWorkOrderId())
                    .orElseThrow(() -> new EntityNotFoundException("Work order not found with id: " + request.getWorkOrderId()));
            existing.setWorkOrder(workOrder);
        }

        if (request.getDescription() != null) existing.setDescription(request.getDescription());
        if (request.getCompleted() != null) existing.setCompleted(request.getCompleted());
        if (request.getOrder() != null) existing.setOrder(request.getOrder());

        return taskRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        WorkOrderTask existing = findById(id);
        taskRepository.delete(existing);
    }
}
