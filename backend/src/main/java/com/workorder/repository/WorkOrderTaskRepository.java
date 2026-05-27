package com.workorder.repository;

import com.workorder.model.WorkOrderTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkOrderTaskRepository extends JpaRepository<WorkOrderTask, Long> {
    List<WorkOrderTask> findByWorkOrderId(Long workOrderId);
}
